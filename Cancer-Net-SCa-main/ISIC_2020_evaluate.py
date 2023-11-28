import torch
import torch.nn as nn
from torch.cuda.amp import autocast
from easydict import EasyDict as edict
import yaml
import pandas as pd
import os, argparse, sys
from ISIC2020_Dataset import ISIC2020TorchDataset, NORM_CHANNEL_MEAN, NORM_CHANNEL_STD
from torch.utils.data import DataLoader
import numpy as np
import torchvision.transforms as T
from time import perf_counter
from sklearn.metrics import confusion_matrix, roc_auc_score

from DarwinNet_659MF import DarwinNetV2, ResHead

parser = argparse.ArgumentParser(description='CancerNet-SCa x AttendNeXt Inferece')
parser.add_argument('--weightspath', default='final-model.pth', type=str, help='Path to trained model weights')
parser.add_argument('-mc', '--model-config', default='DarwinNet_XA_325MF.yml', help='Path to model config file')
parser.add_argument('-dd', '--data-dir', type=str, default='sample-data/', help='Sample image directory')
parser.add_argument('-tf', '--split-file', type=str, default='sample_data_results.csv', help='CSV file with actual results for image directory')
parser.add_argument('-sz', '--size', type=int, default=224, help='Square image size')
parser.add_argument('-mp', '--mixed-precision', action='store_true', help='Flag to enable mixed-precision')
parser.add_argument('-df', '--data-file-name', type=str, default='sample_data_predictions.csv', help='Name of csv file for predictions')
parser.add_argument('-gi', '--gpu-id', type=int, default=0, help='GPU device ID')

args = parser.parse_args()

start_time = perf_counter()

print("Starting script")

num_classes = 1

HYPERPARAMETERS = yaml.load(open(args.model_config, "r"), Loader=yaml.FullLoader)
config = edict(HYPERPARAMETERS)
device = 'cuda:{}'.format(args.gpu_id) if args.gpu_id >= 0 else 'cpu'
model = DarwinNetV2(config.model_cfg, config.input_shape, num_classes)
state_dict = torch.load(args.weightspath, map_location=device)
model.load_state_dict(state_dict)
model = model.to(device)

test_tform = T.Compose([
    T.Resize((args.size, args.size)),
    T.ToTensor(),
    T.Normalize(NORM_CHANNEL_MEAN, NORM_CHANNEL_STD)
])


data_df = pd.read_csv(args.split_file, names=['Image', 'Classification'])
data_files = data_df['Image'].to_numpy()
actual_vals = torch.from_numpy(data_df['Classification'].to_numpy())
isic_dataset = ISIC2020TorchDataset(
    data_files, args.data_dir, transform=test_tform
)
test_loader = DataLoader(isic_dataset, batch_size=256, shuffle=False, num_workers=0)

all_predictions = []
all_image_names = []
model.eval()
with torch.no_grad():
    for data, image_names in test_loader:
        data = data.to(device)
        with autocast(enabled=args.mixed_precision):
            logits = torch.squeeze(model(data))
            predictions = torch.sigmoid(logits)
        all_predictions.extend(predictions.detach().cpu().numpy().ravel().tolist())
        for image_name in image_names:
            all_image_names.append(image_name)

predictions_df = pd.DataFrame.from_dict({'Image': all_image_names, 'Target': all_predictions})
predictions_df.to_csv(args.data_file_name, header=True, index=False)

df_results = predictions_df.merge(data_df, on='Image', how='left')

y_test = np.array(actual_vals)
pred = np.array(df_results['Target'])

y_pred = [int(i > .5) for i in pred]

tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()

sensitivity = tp/(tp+fn)
specificity = tn/(fp+tn)
ppv = tp/(tp+fp)
npv = tn/(tn+fn)

print('Sensitivity: {0:.3f}'.format(sensitivity))
print('Specificity: {0: .3f}'.format(specificity))
print('PPV: {0:.3f}'.format(ppv))
print('NPV: {0:.3f}'.format(npv))

auc = roc_auc_score(y_test, pred)
print('AUC: ', auc)

end_time = perf_counter()
elapsed_time = end_time-start_time

print(f'Total time: {elapsed_time}')