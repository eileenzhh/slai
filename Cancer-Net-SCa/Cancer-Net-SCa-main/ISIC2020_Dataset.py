import os
import torch
from torchvision.datasets.folder import pil_loader
from torch.utils.data import Dataset

NORM_CHANNEL_MEAN = [0.806, 0.621, 0.592]
NORM_CHANNEL_STD = [0.151, 0.177, 0.203]

class ISIC2020TorchDataset(Dataset):
    def __init__(self, data_files, isic_image_dir, targets=None, transform=None):
        self.isic_image_dir = isic_image_dir
        self.data = data_files
        self.targets = targets
        self.transform = transform

    def __len__(self):
        print(len(self.data))
        return len(self.data)
    
    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        image_path = os.path.join(self.isic_image_dir, self.data[idx])
        image = pil_loader(image_path)
        if self.transform is not None:
            image = self.transform(image)
            
        if self.targets is not None:
            target = self.targets[idx]
            return image, target
        else: 
            return image, self.data[idx]
