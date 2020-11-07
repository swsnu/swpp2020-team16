echo "local docker machine installation starts."
echo "..."
echo "..."

echo "[ REMINDER ]"
echo "    If you already have other installed images or containers, press n or N."
echo "    If you are new and want to keep your local machine always clean, press y or Y."

echo -n "Is it okay to remove all your images and containers before installing starts (y/n)?   "

read answer

DIR=$(dirname "$0")
echo "$DIR"
cd "$DIR"

./sanity-check.sh

allok=0

if [ "$answer" != "${answer#[Yy]}" ] ;then
    ./install-after-remove.sh
    allok=1
elif [ "$answer" != "${answer#[Nn]}" ] ;then
    ./install-without-remove.sh
    allok=1
else
    echo "Please press Y,y,N,n only."
fi

./show-ip.sh "$allok"
