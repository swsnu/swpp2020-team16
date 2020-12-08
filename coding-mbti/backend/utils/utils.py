def get_dicts_with_filter(objects, **filter_args):
    return list(map(lambda x: x.to_dict(), objects.filter(**filter_args)))


def get_dicts_with_all(objects):
    return list(map(lambda x: x.to_dict(), objects.all()))


def to_dict(x):
    if x is None:
        return {}
    else:
        return x.to_dict()
