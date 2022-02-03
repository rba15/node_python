import json
import sys

if __name__ == '__main__':
    
    if len(sys.argv) > 0:
        data=json.loads(sys.argv[1])
        sum = data['a'] + data['b']
        print(sum)
        print(1/0)