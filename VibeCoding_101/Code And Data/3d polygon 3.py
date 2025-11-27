# Importing sympy and its Polyhedron class
from sympy import *
from sympy.combinatorics import Polyhedron

# Creating a tetrahedron with four vertices
tetra = Polyhedron([0, 1, 2, 3])

# Printing the vertices and faces of the tetrahedron
print("Vertices:", tetra.vertices)
print("Faces:", tetra.faces)

# Plotting the tetrahedron using its plot() method
tetra.plot()