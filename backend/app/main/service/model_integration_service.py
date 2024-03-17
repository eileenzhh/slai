import torch
import torch.nn as nn
from torch.cuda.amp import autocast
from easydict import EasyDict as edict
import yaml
import pandas as pd
import argparse

# from app.main.service import
from app.main.service.ISIC2020_Dataset import (
    ISIC2020TorchDataset,
    NORM_CHANNEL_MEAN,
    NORM_CHANNEL_STD,
)
from torch.utils.data import DataLoader
import numpy as np
import torchvision.transforms as T

# from time import perf_counter
from sklearn.metrics import confusion_matrix, roc_auc_score
from sklearn.neighbors import NearestNeighbors
from app.main.service.DarwinNet_659MF import DarwinNetV2
import pickle


class Model_Integration_Service:
    def __init__(self):
        print("init")
        # parser = argparse.ArgumentParser(description='CancerNet-SCa x AttendNeXt Inferece')
        # parser.add_argument('--weightspath', default='final-model.pth', type=str, help='Path to trained model weights')
        # parser.add_argument('-mc', '--model-config', default='DarwinNet_XA_325MF.yml', help='Path to model config file')
        # parser.add_argument('-dd', '--data-dir', type=str, default='sample-data/', help='Sample image directory')
        # parser.add_argument('-tf', '--split-file', type=str, default='sample_data_results.csv', help='CSV file with actual results for image directory')
        # parser.add_argument('-sz', '--size', type=int, default=224, help='Square image size')
        # parser.add_argument('-mp', '--mixed-precision', action='store_true', help='Flag to enable mixed-precision')
        # parser.add_argument('-df', '--data-file-name', type=str, default='sample_data_predictions.csv', help='Name of csv file for predictions')
        # parser.add_argument('-gi', '--gpu-id', type=int, default=0, help='GPU device ID')

        # self.args = parser.parse_args()

        # num_classes = 1
        # self.k = 100

        # HYPERPARAMETERS = yaml.load(open(self.args.model_config, "r"), Loader=yaml.FullLoader)
        # config = edict(HYPERPARAMETERS)
        # self.device = 'cuda:{}'.format(self.args.gpu_id) if self.args.gpu_id >= 0 else 'cpu'
        # self.model = DarwinNetV2(config.model_cfg, config.input_shape, num_classes)
        # self.state_dict = torch.load(self.args.weightspath, map_location=self.device)
        # self.model.load_state_dict(self.state_dict)
        # self.model = self.model.to(self.device)

        # test_tform = T.Compose([
        #     T.Resize((self.args.size, self.args.size)),
        #     T.ToTensor(),
        #     T.Normalize(NORM_CHANNEL_MEAN, NORM_CHANNEL_STD)
        # ])

        # # data_df = pd.read_csv(self.args.split_file, names=['Image', 'target'])
        # # data_files = data_df['Image'].to_numpy()
        # # self.actual_vals = torch.from_numpy(data_df['Classification'].to_numpy())
        # data_df = pd.read_csv(self.args.split_file)
        # self.data_files = data_df['isic_id'].to_numpy()
        # self.actual_vals = data_df['target'].to_numpy()
        # self.actual_diag = data_df['diagnosis'].to_numpy()

        # metadata = {'isic_id': self.data_files, 'target': self.actual_vals, 'diagnosis': self.actual_diag}
        # self.metadata = pd.DataFrame(data=metadata)
        # print(self.metadata)

        # isic_dataset = ISIC2020TorchDataset(
        #     self.data_files, self.args.data_dir, transform=test_tform
        # )
        # self.test_loader = DataLoader(isic_dataset, batch_size=256, shuffle=False, num_workers=0)

        # # Load embeddings
        # pkl_file = open('embeddings1.pkl', 'rb')
        # self.stored_embeddings = pickle.load(pkl_file)['embeddings']
        # self.stored_embeddings = pd.DataFrame(self.stored_embeddings)
        # pkl_file.close()

        # pkl_file = open('image_names.pkl', 'rb')
        # self.stored_image_names = pickle.load(pkl_file)['image_names']
        # pkl_file.close()

    def evaluate(self):
        print("evaluate")

        # self.model.eval()
        # self.input_image_name = []
        # with torch.no_grad():
        #     for data, img_names in self.test_loader:
        #         data = data.to(self.device)
        #         with autocast(enabled=self.args.mixed_precision):
        #             self.input_embedding = self.model((data))
        #         for name in img_names:
        #             self.input_image_name = name

    def get_neighbours(self):
        print("get_neighbours")
        # knn = NearestNeighbors(n_neighbors=self.k)
        # knn.fit(self.stored_embeddings) # <-- Database of embeddings
        # dists, indices = knn.kneighbors(self.input_embedding)

        # # inverted distance
        # with np.errstate(divide='ignore'):
        #     dinv = np.nan_to_num(1 / dists)

        # # an array with distinct class labels
        # distinct_labels = np.array(list(set(self.actual_vals)))
        # # an array with labels of neighbors
        # neigh_labels = self.metadata.loc[indices, 'target']
        # # compute the weighted score for each potential label
        # weighted_scores = ((neigh_labels[:, :, np.newaxis] == distinct_labels) * dinv[:, :, np.newaxis]).sum(axis=1)
        # # choose the label with the highest score
        # predictions = distinct_labels[weighted_scores.argmax(axis=1)]
