#!/bin/bash -ex
git checkout .
git pull --rebase origin master
git branch -D release || true
GULP=${GULP:=gulp}
git checkout -b release
# Freeze dependency versions
npm shrinkwrap --dev
git add -f npm-shrinkwrap.json
$GULP release
V=$(ls package/chrome | cut -d'-' -f3)
VERSION=${V::-4}
git commit -m "Update $VERSION"
git tag release-$VERSION
git push --tags
git checkout -f master
git clean -fd
$GULP release
git commit -am "Post-release $VERSION"
git push origin master
echo Deploying Google Engine Switch
scp -Cr package/firefox/* package/chrome/* TODO
