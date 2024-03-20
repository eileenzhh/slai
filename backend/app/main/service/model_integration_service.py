import torch
import torch.nn as nn
from torch.cuda.amp import autocast
from easydict import EasyDict as edict
import yaml
import pandas as pd
from app.main.service.ISIC2020_Dataset import (
    ISIC2020TorchDataset,
    NORM_CHANNEL_MEAN,
    NORM_CHANNEL_STD,
)
from torch.utils.data import DataLoader
import numpy as np
import torchvision.transforms as T
from PIL import Image
import io

# from time import perf_counter
from sklearn.neighbors import NearestNeighbors
from app.main.service.DarwinNet_659MF import DarwinNetV2
import pickle


class Model_Integration_Service:
    def __init__(self):
        print("init")
        num_classes = 1
        self.K = 100
        self.k = 5

        HYPERPARAMETERS = yaml.load(
            open("DarwinNet_XA_325MF.yml", "r"), Loader=yaml.FullLoader
        )
        config = edict(HYPERPARAMETERS)
        self.device = "cpu"
        self.model = DarwinNetV2(config.model_cfg, config.input_shape, num_classes)
        self.state_dict = torch.load("final-model.pth", map_location=self.device)
        self.model.load_state_dict(self.state_dict)
        self.model = self.model.to(self.device)

        self.transform = T.Compose(
            [
                T.Resize((224, 224)),
                T.ToTensor(),
                T.Normalize(NORM_CHANNEL_MEAN, NORM_CHANNEL_STD),
            ]
        )

        data_df = pd.read_csv("ISIC_2020_Training_GroundTruth.csv")
        data_files = data_df["isic_id"].to_numpy()
        actual_vals = data_df["target"].to_numpy()
        actual_diag = data_df["diagnosis"].to_numpy()
        sex = data_df["sex"].to_numpy()
        age_approx = data_df["age_approx"].to_numpy()
        anatom = data_df["anatom_site_general_challenge"].to_numpy()
        benign_malignant = data_df["benign_malignant"].to_numpy()

        mdata = {
            "isic_id": data_files,
            "target": actual_vals,
            "diagnosis": actual_diag,
            "sex": sex,
            "age_approx": age_approx,
            "anatom_site_general_challenge": anatom,
            "benign_malignant": benign_malignant,
        }

        self.metadata = pd.DataFrame(data=mdata)

        # Load embeddings
        pkl_file = open("embeddings1.pkl", "rb")
        self.stored_embeddings = pickle.load(pkl_file)["embeddings"]
        pkl_file.close()
        self.stored_embeddings = pd.DataFrame(self.stored_embeddings)

    def get_neighbours(self):
        print("get_neighbours")
        knn = NearestNeighbors(n_neighbors=self.K)
        knn.fit(self.stored_embeddings)  # <-- Database of embeddings
        dists, indices = knn.kneighbors(self.input_embedding)

        # Apply weighted class labels to the K nearest neighbours
        indices_list = indices.tolist()[0]
        labels = np.array(self.metadata.loc[indices_list, "target"])
        weights = (labels * 1 / 8) + 1
        dists = np.divide(dists[0], weights)

        # Sort and find the weighted k nearest neighbours
        neighbors = np.column_stack((dists, indices_list))
        neighbors = neighbors[np.argsort(neighbors[:, 0])]
        final_indices = neighbors[: self.k, 1]

        # Return image file names and targets as an array of dictionaries
        image_dicts = []
        for ind in final_indices:
            image_dicts.append(
                {
                    "filename": self.metadata.loc[ind, "isic_id"],
                    "sex": self.metadata.loc[ind, "sex"],
                    "age_approx": int(self.metadata.loc[ind, "age_approx"]),
                    "anatom_site_general": self.metadata.loc[
                        ind, "anatom_site_general_challenge"
                    ],
                    "target": int(self.metadata.loc[ind, "target"]),
                    "diagnosis": self.metadata.loc[ind, "diagnosis"],
                    "benign_malignant": self.metadata.loc[ind, "benign_malignant"],
                }
            )

        return image_dicts

        return image_dicts

    def evaluate(self, input_image_bytes):
        print("evaluate")
        self.input_image = Image.open(io.BytesIO(input_image_bytes))
        self.input_image = self.transform(self.input_image).unsqueeze(0)

        self.model.eval()
        with torch.no_grad():
            data = self.input_image.to(self.device)
            with autocast(enabled="store_true"):
                self.input_embedding = self.model((data))

        cases = self.get_neighbours()

        return cases
