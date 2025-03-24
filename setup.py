# -*- coding: utf-8 -*-
import os
from setuptools import setup, find_packages


with open('README.rst') as f:
    readme = f.read()

def read(filename):
    filepath = os.path.join(os.path.dirname(__file__), filename)
    file = open(filepath, 'r')
    return file.read()


setup(
    name='kryptt',
    version='0.1.0',
    author='Jon, The Gen AI Developer',
    author_email='jonathan.white.jm@gmail.com',
    description=readme,
    long_description=read('README.md'),
    long_description_content_type="text/markdown",
    license='GNU General Public License v3.0',
    keywords=[],
    url='https://github.com/jondoescoding/crypt',
    packages=find_packages(),
    scripts=[],
    install_requires=[],
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Console',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3',
        'Topic :: Scientific/Engineering :: Artificial Intelligence'
    ],
)

