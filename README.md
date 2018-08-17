# intervals-composite
Having multiple intervals started in a node project can complicate the code especially in the shutdown process where intervals need to be cleared and modules are forced to expose their internal intervals. This package solves the problem by building an object that manages all intervals and providing an interface to work with them individually or as a composite.
