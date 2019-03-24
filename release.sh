#!/bin/sh

git checkout master &&
echo "Bumping version..." &&
new_version=`yarn version --major --no-git-tag-version | grep -o "[0-9]*\.0\.0" | tail -1 | grep -o "[0-9]*"` &&
echo "New version: $new_version. Updating version.ts" &&
echo "//File updated automatically, don't change\nexport const VERSION = '$new_version';" > src/version.ts &&
git reset &&
git add package.json src/version.ts &&
git commit -m "Release version $new_version" &&
git push &&
echo "Creating new version on Google App Scripts..." &&
version_description=`git log --oneline -1 | cat` && # e.g. ec2ab6f My commit message
echo "Pushing code..." &&
yarn deploy &&
echo "Creating new version: $version_description" &&
version_number=`clasp version "$version_description" | grep -o '[0-9][0-9]*' | tail -1` &&
echo "Created version $version_number"
