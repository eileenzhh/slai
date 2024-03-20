from collections import OrderedDict, deque
import time

# 5 minutes  = 300 seconds
TIME_LIMIT = 300


class Cache_Service:
    def __init__(self):
        self.current_image = None
        self.current_cases = None
        self.images = {}
        self.cases = {}
        self.queue = deque()
        self.ids_count = 0

    def add(self, image_data, cases):
        self.invalidate_and_clear_cache()
        cur_time = time.time()

        id = self.ids_count
        self.ids_count += 1

        self.queue.append((cur_time, id))
        self.images[id] = image_data
        self.cases[id] = cases

    def get_history(self):
        self.invalidate_and_clear_cache()
        return list(self.queue)

    def add_current_case(self, current_image, current_cases):
        # if self.current_image or self.current_cases:
        #     return
        self.current_image = current_image
        self.current_cases = current_cases

    def get_current_case(self):
        return self.current_image, self.current_cases

    def clear_current_case(self):
        self.current_image = None
        self.current_cases = None

    def save_current_case(self):
        if self.current_image and self.current_cases:
            self.add(self.current_image, self.current_cases)
            self.clear_current_case()

    def invalidate_and_clear_cache(self):
        cur_time = time.time()

        while self.queue and self.queue[0][0] < (cur_time - TIME_LIMIT):
            key = self.queue.popleft()[1]

            self.images.pop(key)
            self.cases.pop(key)

    def clear_all_cache(self):
        self.images.clear()
        self.cases.clear()
        self.queue.clear()
        self.current_image = None
        self.current_cases = None
