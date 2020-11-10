from django.core.management.base import BaseCommand
from problem.models import Solution, Problem, ProblemInput, ProblemOutput
import logging

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
        style=1,
        name="ITP1_6_B",
        content="""Taro is going to play a card game. However, now he has only n cards, even though there should be 52 cards (he has no Jokers). The 52 cards include 13 ranks of each of the four suits: spade, heart, club and diamond.
        In the first line, the number of cards n (n ≤ 52) is given. In the following n lines, data of the n cards are given. Each card is given by a pair of a character and an integer which represent its suit and rank respectively. A suit is represented by 'S', 'H', 'C' and 'D' for spades, hearts, clubs and diamonds respectively. A rank is represented by an integer from 1 to 13.
        Print the missing cards. The same as the input format, each card should be printed with a character and an integer separated by a space character in a line. Arrange the missing cards in the following priorities: Print cards of spades, hearts, clubs and diamonds in this order. If the suits are equal, print cards with lower ranks first.""",
    )
    problem1.save()

    problem1_input = ProblemInput(
        problem=problem1,
        content="""47
S 10
S 11
S 12
S 13
H 1
H 2
S 6
S 7
S 8
S 9
H 6
H 8
H 9
H 10
H 11
H 4
H 5
S 2
S 3
S 4
S 5
H 12
H 13
C 1
C 2
D 1
D 2
D 3
D 4
D 5
D 6
D 7
C 3
C 4
C 5
C 6
C 7
C 8
C 9
C 10
C 11
C 13
D 9
D 10
D 11
D 12
D 13""",
    )

    problem1_input.save()

    problem1_output = ProblemOutput(
        problem_input=problem1_input,
        content="""S 1
H 3
H 7
C 12
D 8""",
    )

    problem1_output.save()

    problem2 = Problem(
        style=2,
        name="ITP2_3_B",
        content="""Write a program which manipulates a sequence A={a0,a1,...,an−1} by the following operations: min(b,e): report the minimum element ab,ab+1,...,ae−1 max(b,e): report the maximum element ab,ab+1,...,ae−1
      The input is given in the following format. In the first line, n (the number of elements in A) is given. In the second line, ai (each element in A) are given. In the third line, the number of queries q is given and each query is given in the following q lines. comi denotes a type of query. 0 and 1 represents min(b,e) and max(b,e) respectively.
      For each query, print the minimum element or the maximum element in a line.""",
    )
    problem2.save()

    problem2_input = ProblemInput(
        problem=problem2,
        content="""7
8 3 7 1 9 1 4
3
0 0 3
0 1 5
1 0 7""",
    )

    problem2_input.save()

    problem2_output = ProblemOutput(
        problem_input=problem2_input,
        content="""3
1
9""",
    )
    problem2_output.save()

    logger.info("problems created.")


def run_seed(self, mode):

    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    create_data()