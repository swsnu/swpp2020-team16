def get_dicts_with_filter(objects, **filter_args):
    return list(map(lambda x: x.to_dict(), objects.filter(**filter_args)))


def get_dicts_with_all(objects):
    return list(map(lambda x: x.to_dict(), objects.all()))
