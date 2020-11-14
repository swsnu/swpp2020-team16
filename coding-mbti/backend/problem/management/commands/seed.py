import logging
from django.core.management.base import BaseCommand
from django.conf import settings
from problem.models import Problem, ProblemInput, ProblemOutput

def read_test_cases(option, pid):
    with open(f"{settings.PROB_DIR}/test_cases/{pid}_{option}.txt", "r") as f :
        test_cases = f.read().split("/")
    return test_cases

logger = logging.getLogger(__name__)
# python manage.py seed --mode=init

MODE_INIT = "init"
MODE_CLEAR = "clear"


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


def clear_data():
    logger.info("Delete Problem instances")

    Problem.objects.all().delete()
    ProblemInput.objects.all().delete()
    ProblemOutput.objects.all().delete()


def create_data():
    logger.info("Creating Problems")
    problem1 = Problem(
        objective=1,
        pid="ITP1_6_B",
        title="Finding Missing Cards",
        input_desc="In the first line, the number of cards n (n ≤ 52) is given. In the following n lines, data of the n cards are given. Each card is given by a pair of a character and an integer which represent its suit and rank respectively. A suit is represented by 'S', 'H', 'C' and 'D' for spades, hearts, clubs and diamonds respectively. A rank is represented by an integer from 1 to 13.",
        output_desc="Print the missing cards. The same as the input format, each card should be printed with a character and an integer separated by a space character in a line. Arrange the missing cards in the following priorities: Print cards of spades, hearts, clubs and diamonds in this order. If the suits are equal, print cards with lower ranks first.",
        desc="Taro is going to play a card game. However, now he has only n cards, even though there should be 52 cards (he has no Jokers). The 52 cards include 13 ranks of each of the four suits: spade, heart, club and diamond.",
    )
    problem1.save()

    problem1_input = ProblemInput(
        problem=problem1,
        test_cases=read_test_cases("input","ITP1_6_B")

    )

    problem1_input.save()

    problem1_output = ProblemOutput(
        problem_input=problem1_input,
        test_cases=read_test_cases("output","ITP1_6_B")
    )

    problem1_output.save()

    problem2 = Problem(
        objective=2,
        pid="ITP2_3_B",
        title="Min-Max Element",
        desc="Write a program which manipulates a sequence A={a0,a1,...,an−1} by the following operations: min(b,e): report the minimum element ab,ab+1,...,ae−1 max(b,e): report the maximum element ab,ab+1,...,ae−1",
        input_desc="The input is given in the following format. In the first line, n (the number of elements in A) is given. In the second line, ai (each element in A) are given. In the third line, the number of queries q is given and each query is given in the following q lines. comi denotes a type of query. 0 and 1 represents min(b,e) and max(b,e) respectively.",
        output_desc="For each query, print the minimum element or the maximum element in a line.",
    )
    problem2.save()

    problem2_input = ProblemInput(
        problem=problem2,
        test_cases=read_test_cases("input","ITP2_3_B"),
    )

    problem2_input.save()

    problem2_output = ProblemOutput(
        problem_input=problem2_input,
        test_cases=read_test_cases("output","ITP2_3_B"),
    )
    problem2_output.save()

    logger.info("problems created.")


def run_seed(_self, mode):
    clear_data()
    if mode == MODE_CLEAR:
        return

    create_data()
