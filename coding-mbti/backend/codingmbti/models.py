'''예시 모델입니다.

'''
from django.db import models


class Name(models.Model):
    '''Name 모델.

    이 클래스는 사용하지 않습니다. 원활한 개발을 위한 예시 모델입니다.

    '''

    #: list(str) : 이름 필드(max_length=120)
    name = models.CharField(max_length=120)

# Create your models here.
