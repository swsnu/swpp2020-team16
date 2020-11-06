from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sklearn
import joblib
import json
from json import JSONDecodeError
import pickle
import os
import numpy as np

print(os.getcwd())


def predict_readability(data, pid):
    pid = pid
    vectorizer = pickle.load(
        open(os.getcwd()+'/analysis/ML/problem{}/tf-idf_vectorizer.pickle'.format(pid), 'rb'))

    clf_from_joblib = joblib.load(
        os.getcwd()+'/analysis/ML/problem{}/model_read.pkl'.format(pid))

    predict = int(clf_from_joblib.predict(
        vectorizer.transform([data]).toarray()))

    probability = float(np.max(clf_from_joblib.predict_proba(
        vectorizer.transform([data]).toarray())))
    return (predict, probability)


def predict_style(data, pid):
    pid = pid
    vectorizer = pickle.load(
        open(os.getcwd()+'/analysis/ML/problem{}/tf-idf_vectorizer.pickle'.format(pid), 'rb'))

    clf_from_joblib = joblib.load(
        os.getcwd()+'/analysis/ML/problem{}/model_style.pkl'.format(pid))

    predict = int(clf_from_joblib.predict(
        vectorizer.transform([data]).toarray()))

    probability = float(np.max(clf_from_joblib.predict_proba(
        vectorizer.transform([data]).toarray())))
    return (predict, probability)


@ csrf_exempt
def provide_analysis_result(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            source_code = json.loads(body)['source_code']
            elapsed_time = json.loads(body)['elapsed_time']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        predict_read, prob_read = predict_readability(source_code, "ITP1_6_B")
        predict_st, prob_st = predict_style(source_code, "ITP1_6_B")
        response_dict = {'readability': predict_read, 'readability_prob': prob_read,
                         'style': predict_st, 'style_prob': prob_st}
        return JsonResponse(response_dict, status=200, safe=False)

    else:
        return HttpResponseNotAllowed(['GET', 'UPDATE', 'DELETE'])
