from collections import OrderedDict, deque
import time


class Cache_Service:
    def __init__(self):
        self.images = {}
        self.cases = {}
        self.queue = deque()

        # for testing
        self.images[1] = "test_data"
        self.images[2] = "test_data"
        self.cases[1] = ["some_url", "some_url"]
        self.cases[2] = ["some_url", "some_url"]
        self.queue.append((123, 1))
        self.queue.append((123, 2))

    def add(self, id, image_data, cases):
        self.invalidate_and_clear_cache()
        cur_time = time.time()

        self.queue.append((cur_time, id))
        self.images[id] = image_data
        self.cases[id] = cases
        print(id, image_data, cases)

    def get(self):
        self.invalidate_and_clear_cache()
        return list(self.images.keys())

    def invalidate_and_clear_cache(self):
        cur_time = time.time()

        # 5 minutes  = 300 seconds
        while self.queue and self.queue[0][0] < (cur_time - 300):
            key = self.queue.popleft()[1]

            self.images.pop(key)
            self.cases.pop(key)

    def clear_all_cache(self):
        self.images.clear()
        self.cases.clear()
        self.queue.clear()
