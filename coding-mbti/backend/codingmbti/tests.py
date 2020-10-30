'''Name class test

    이 파일은 예시파일입니다. 
    서비스에 사용하지 않을 예정입니다.
'''
# Create your tests here.
import pytest
from django.test import TestCase, Client
import json
from .models import Name


class NameTestCase(TestCase):
    def setUp(self):
        ''' 데이터베이스 초기 데이터 상태를 셋업하는 함수

            * 마이그레이션 데이터의 존재를 가정합니다.
              - 기존의 데이터는 `prev_data`에 저장합니다.

            * 새 데이터 하나를 확인용으로 추가합니다.
              - 새 데이터는 `new_datum`에 저장합니다.
        '''
        self.URL = '/api/name'
        self.POST_PARAMS = {
            "path": self.URL,
            "data": "TODO for each post method test",
            "content_type": 'application/json',
        }
        self.prev_data = Name.objects.all()

        mocked_name_obj_1 = Name(name="name_1")
        mocked_name_obj_1.save()

        self.new_datum = mocked_name_obj_1

        self.posting_datum = {"name": "Channy"}

    def test_200_get_name(self):
        ''' 이름을 get하는 함수

            이름의 리스트를 받아올 것을 가정합니다.

            테스트 사항
                (1) status code가 200인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.get(self.URL)
        self.assertEqual(response.status_code, 200)

    def test_200_get_valid_name_id(self):
        ''' valid id를 파라미터로 사용해 get하는 함수

            테스트 사항
                (1) status code가 200인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.get(self.URL + '/1')
        self.assertEqual(response.status_code, 200)

    def test_400_get_invalid_name_id(self):
        ''' invalid id를 파라미터로 사용해 get하는 함수

            테스트 사항
                (1) status code가 400인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.get(self.URL + '/100')
        self.assertEqual(response.status_code, 400)

    def test_204_post_name(self):
        ''' 새로운 이름을 post하는 함수

            테스트 사항
                (1) status code가 204인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        self.POST_PARAMS['data'] = json.dumps(self.posting_datum)
        response = client.post(**self.POST_PARAMS)
        self.assertEqual(response.status_code, 204)

    def test_400_post_name(self):
        ''' invalid key를 사용해 post하는 함수

            테스트 사항
                (1) status code가 400인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        self.POST_PARAMS['data'] = json.dumps({"invalid_key": "channy"})
        response = client.post(**self.POST_PARAMS)
        self.assertEqual(response.status_code, 400)

    def test_204_delete_name(self):
        ''' valid id로 사용해 delete하는 함수

            테스트 사항
                (1) status code가 204인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.delete(self.URL + '/' + str(self.new_datum.id))
        self.assertEqual(response.status_code, 204)

    def test_400_delete_name(self):
        ''' invalid id로 사용해 delete하는 함수

            테스트 사항
                (1) status code가 400인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.delete(
            self.URL + '/' + str(self.new_datum.id + 1))
        self.assertEqual(response.status_code, 400)

        response = client.delete(self.URL)
        self.assertEqual(response.status_code, 400)

    def test_invalid_method(self):
        ''' invalid method에 405를 내어주나?

            테스트 사항
                (1) status code가 405인지 확인합니다.
        '''
        client = Client(enforce_csrf_checks=False)
        response = client.put(self.URL)
        self.assertEqual(response.status_code, 405)
