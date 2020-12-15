from locust import HttpUser, TaskSet, task, between


class MyTaskSet(TaskSet):

    def on_start(self):
        self.login()

    def login(self):
        response = self.client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken']
        res = self.client.post('/api/user/login/',
                               json={
                                   'username': 'locust123', 'password': '1718c24b10aeb8099e3fc44960ab6949ab76a267352459f203ea1036bec382c2'},
                               headers={'X-CSRFToken': csrftoken, 'content-type': 'application/json'})

    @task
    def get_problem(self):
        self.client.get("/api/problem/")

    @task
    def get_probem_input(self):
        self.client.get("/api/problem/objective/")


class MyLocus(HttpUser):
    tasks = {MyTaskSet: 2}
    min_wait = 50
    max_wait = 500
