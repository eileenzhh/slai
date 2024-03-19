import torch
import torch.nn as nn
from torch.cuda.amp import autocast
from easydict import EasyDict as edict
import yaml
import pandas as pd
from app.main.service.ISIC2020_Dataset import NORM_CHANNEL_MEAN, NORM_CHANNEL_STD
# from torch.utils.data import DataLoader
import numpy as np
import torchvision.transforms as T
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

        HYPERPARAMETERS = yaml.load(open("DarwinNet_XA_325MF.yml", "r"), Loader=yaml.FullLoader)
        config = edict(HYPERPARAMETERS)
        self.device = 'cpu'
        self.model = DarwinNetV2(config.model_cfg, config.input_shape, num_classes)
        self.state_dict = torch.load("final-model.pth", map_location=self.device)
        self.model.load_state_dict(self.state_dict)
        self.model = self.model.to(self.device)

        self.transform = T.Compose([
            T.Resize((224, 224)),
            T.ToTensor(),
            T.Normalize(NORM_CHANNEL_MEAN, NORM_CHANNEL_STD)
        ])

        data_df = pd.read_csv('ISIC_2020_Training_GroundTruth.csv')
        data_files = data_df['isic_id'].to_numpy()
        actual_vals = data_df['target'].to_numpy()
        actual_diag = data_df['diagnosis'].to_numpy()

        mdata = {
            'isic_id': data_files, 
            'target': actual_vals, 
            'diagnosis': actual_diag
            }
        
        self.metadata = pd.DataFrame(data=mdata)

        # Load embeddings
        pkl_file = open('embeddings1.pkl', 'rb')
        self.stored_embeddings = pickle.load(pkl_file)['embeddings']
        pkl_file.close()
        self.stored_embeddings = pd.DataFrame(self.stored_embeddings)


    def evaluate(self, input_image):
        print("evaluate")

        self.input_image = self.transform(input_image).unsqueeze(0)
    
        # self.test_loader = DataLoader(isic_dataset, batch_size=256, shuffle=False, num_workers=0)
        self.model.eval()
        with torch.no_grad():
            data = self.input_image.to(self.device)
            with autocast(enabled='store_true'):
                self.input_embedding = self.model((data))
                
    def get_neighbours(self):
        print("get_neighbours")
        knn = NearestNeighbors(n_neighbors=self.K)
        knn.fit(self.stored_embeddings) # <-- Database of embeddings
        dists, indices = knn.kneighbors(self.input_embedding)

        # Apply weighted class labels to the K nearest neighbours
        indices_list = indices.tolist()[0]
        labels = np.array(self.metadata.loc[indices_list, 'target'])
        weights = (labels * 1/3) + 1
        dists = np.divide(dists[0], weights)

        # Sort and find the weighted k nearest neighbours
        neighbors = np.column_stack((dists, indices_list))
        neighbors = neighbors[np.argsort(neighbors[:,0])]
        final_indices = neighbors[:self.k, 1]

        # Return image file names and targets as an array of dictionaries
        image_dicts = []
        for ind in final_indices:
            image_dicts.append({
                "image_name": self.metadata.loc[ind, 'isic_id'],
                "target": self.metadata.loc[ind, 'target'],
                "diagnosis": self.metadata.loc[ind, 'diagnosis']
            })

        return image_dicts

        # inverted distance
        with np.errstate(divide='ignore'):
            dinv = np.nan_to_num(1 / dists)

        # an array with distinct class labels
        distinct_labels = np.array(list(set(self.actual_vals)))
        # an array with labels of neighbors
        neigh_labels = self.metadata.loc[indices, 'target']
        # compute the weighted score for each potential label
        weighted_scores = ((neigh_labels[:, :, np.newaxis] == distinct_labels) * dinv[:, :, np.newaxis]).sum(axis=1)
        # choose the label with the highest score
        predictions = distinct_labels[weighted_scores.argmax(axis=1)]

        # Return image file names and target array of dictionary

        #[{"image_name": 123.jpg, "target": 0}, {"image_name": 123.jpg, "target": 0}]
