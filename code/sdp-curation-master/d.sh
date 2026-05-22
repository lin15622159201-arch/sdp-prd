#!/bin/bash

# 在当前目录及所有子目录中查找名为 target 的文件夹，并删除它们
find . -type d -name "target" -exec rm -rf {} +

echo "所有的 target 文件夹已被删除。"


find . -type f -name "*.iml" -exec rm -f {} +
echo "所有的 iml 文件夹已被删除。"

find . -name '*pom.xml' -exec rm {} +
echo "所有的 pom.xml 文件夹已被删除。"