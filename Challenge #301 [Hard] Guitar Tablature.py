# https://www.reddit.com/r/dailyprogrammer/comments/5rt1cj/20170203_challenge_301_hard_guitar_tablature/dda2j7p/

from queue import PriorityQueue

notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
open_string_notes = [40, 35, 31, 26, 21, 16] # the natural note of the strings in seminote format presented in a list

q = PriorityQueue() # there are three forms of queues:queue, LifoQueue, priorityqueue. They differ in the order of entries are retrieved. 
for open_note in open_string_notes:
		# takes in an input truncating the first two characters and the last character. Also replaces '|' and '-' with '-' and ' - ' respectively.  
    line = input()[2:-1].replace('|', '-').replace('-', ' - ').split() 
    for j in range(len(line)): # runs the loop once for each character in the modified input
        if line[j] != '-': # checks to see if the character is a music note 
            octave, note = divmod(open_note + int(line[j]), 12) # divmod(arg1, arg2). it divides args1 by 2 and presents two numbers: the floor value and the remainder value. The emainder value would be the semi-tones while the floor value would be the octave
            q.put((j, str(notes[note])+str(octave + 1))) # sending data in the que, the data being a tupple of which character and the respective note value. The j value must indicate the chronological order of the notes as the queue entries are recieved from lowest value firt for prioirtyqueue. 
while not q.empty(): # .empty() checks to see if the que is empty or not, returns a boolean
    print(q.get()[1], end = ' ') #get() recieves a entry from the queue 
print()