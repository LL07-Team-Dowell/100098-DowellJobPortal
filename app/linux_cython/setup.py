from setuptools import setup
from Cython.Build import cythonize
setup(
    ext_modules = cythonize("itr_linux.pyx")
)
