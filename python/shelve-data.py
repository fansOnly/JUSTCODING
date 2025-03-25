import shelve

# create a shelf object
shelf = shelve.open('mydata')

# store some data in the shelf
shelf['name'] = 'John'
shelf['age'] = 30


# retrieve the data from the shelf
# keys = list(shelf.keys())
# print(keys)

# values = list(shelf.values())
# print(values)

# close the shelf
shelf.close()