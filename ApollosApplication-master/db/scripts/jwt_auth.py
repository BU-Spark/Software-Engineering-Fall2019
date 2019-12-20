#CITATION:https://pythontips.com/2013/07/28/generating-a-random-string/

import random
import string

#generates random secret key for JWT
def generateSK(size=32, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for x in range(size))



