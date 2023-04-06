---
title: 'Python str() function with more than two lines'
date: '2023-04-05'
image: /static/images/blog/python-str-function.png
tags:
  - PYTHON
---

## So how does it work?

Python’s data types include float, integer, Boolean, and string. The programming language provides several functions you can use to convert any of these data types to the other.

One of those functions we’ll look at in this article is str(). It’s a built-in function you can use to convert any non-string object to a string.

## What is the str() Function?

The str() function takes a compulsory non-string object and converts it to a string. This object the str() function takes can be a float, integer, or even a Boolean.

Apart from the compulsory data to convert to a string, the str() function also takes two other parameters. Here are all the parameters it takes:

- object: the data you want to convert to a string. It’s a compulsory parameter. If you don’t provide it, str() returns an empty string as the result.
- encoding: the encoding of the data to convert. It’s usually UTF-8. The default is UTF-8 itself.
- errors: specifies what to do if decoding fails. The values you can use for this parameter include strict, ignore, replace, and others.

## Basic Syntax of the str() Function

You have to comma-separate each of the parameters in the str() function, and the values of both encoding and errors have to be in strings:

```python
str(object_to_convert, encoding='encoding', errors='errors')
```

## How to Use the str() Function

First, let’s see how to use all the parameters of the str() function:

```python
my_num = 45
converted_my_num = str(my_num, encoding='utf-8', errors='errors')

print(converted_my_num)
```

If you run the code, you’ll get this error:

```python
converted_my_num = str(my_num, encoding='utf-8', errors='errors')
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
TypeError: decoding to str: need a bytes-like object, int found
```

This error occurs because you’re using the encoding parameter without providing a bytes object. In this case, you don’t need the encoding and errors at all. You only need the number you want to convert:

```python
my_num = 45
converted_my_num = str(my_num)

print(converted_my_num) # 45
```

## Conclusion

You’ve seen that the str() function is instrumental in converting non-string objects and primitive data types to strings.

You might be wondering if you can use the str() function to convert iterable data like lists, tuples, and dictionaries to a string. Well, you don’t get an error if you do that, what you’ll get back is the iterable as it is:

```python
my_list = ['ant', 'soldier', 'termite']
converted_my_list = str(my_list)

print(converted_my_list) # ['ant', 'soldier', 'termite']
```

Same thing is applicable to dictionaries and tuples.

Thank you for reading.
