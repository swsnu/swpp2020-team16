from django.test import TestCase, Client
import json

class AnalysisTestCase(TestCase):

  def test_signup(self):
          client = Client()
          result_dict = {
    "source_code":"n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
    "elapsed_time":18
}
          response = client.post('/api/analysis/test/', json.dumps(result_dict), content_type='application/json')

          self.assertEqual(response.status_code, 200)
