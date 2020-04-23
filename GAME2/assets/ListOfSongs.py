from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('./') if isfile(join('./', f))]
f = open("ListOfSongs.txt", 'w')
for name in onlyfiles:
    if(".abc" in name):
        f.write(name+"\n")
f.close()