# set repobase as repo-root/coding-mbti
REPOBASE=`git rev-parse --show-toplevel`
cd $REPOBASE



rm .git/hooks/pre-commit*
rm .git/hooks/pre-push*



chmod +x ./etc/githook-scripts/pre-commit-lint
chmod +x ./etc/githook-scripts/pre-push-lint-test



cp etc/githook-scripts/pre-commit-lint .git/hooks/pre-commit
cp etc/githook-scripts/pre-push-lint-test .git/hooks/pre-push

