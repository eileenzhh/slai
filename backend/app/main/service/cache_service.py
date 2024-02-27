from collections import OrderedDict
import time


class Cache_Service:
    def __init__(self):
        self.images = OrderedDict()
        self.images[1] = {"timestamp": 123, "data": "test_data"}
        self.images[2] = {"timestamp": 123, "data": "test_data"}

        self.cases = OrderedDict()
        self.cases[1] = ["some_url", "some_url"]
        self.cases[2] = ["some_url", "some_url"]

    def add(self, id, image_data, cases):
        self.clear_cache()
        cur_time = time.time()

        self.images[id] = {"timestamp": cur_time, "data": image_data, "cases": cases}
        self.cases[id] = cases
        print(id, image_data, cases)

    def get(self):
        self.clear_cache()
        return list(self.images.keys())

    def clear_cache(self):
        cur_time = time.time()

        keys = list(self.images.keys())
        print(keys)
        for key in keys:
            print(key)
            # 5 minutes  = 300 seconds
            if key in self.images and self.images[key]["timestamp"] < (cur_time - 300):
                print(self.images[key]["timestamp"], cur_time)
                self.images.pop(key)
                self.cases.pop(key)
            else:
                break
