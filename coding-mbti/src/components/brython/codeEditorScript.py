from browser import document, window
import time
import sys
import traceback

output = ''


class cOutput:
    encoding = 'utf-8'

    def __init__(self):
        self.cons = document["console"]
        self.buf = ''

    def write(self, data):
        self.buf += str(data)

    def flush(self):
        self.cons.value += self.buf
        self.buf = ''

    def __len__(self):
        return len(self.buf)


# initiate console element as stdout/stderr.
if "console" in document:
    cOut = cOutput()
    sys.stdout = cOut
    sys.stderr = cOut
    document['console'].value += "console init."


def run(event):
    global output

    # clear console when new code runs
    document["console"].value = ''

    # get source code of user
    src = document['code-pipe'].value

    # add test code
    src = src + "\n\nassert(fixedFunctionName(0) == 3)"

    # set timer
    t0 = time.perf_counter()
    try:
        # run user's code
        ns = {'__name__': '__main__'}
        exec(src, ns)
        state = 1
    except Exception:
        # print error with trace
        traceback.print_exc(file=sys.stderr)
        state = 0

    # return console output
    sys.stdout.flush()
    output = document["console"].value

    # add completion time
    print('<completed in %6.2f ms>' % ((time.perf_counter() - t0) * 1000.0))
    return state


document['run'].bind('click', run)
