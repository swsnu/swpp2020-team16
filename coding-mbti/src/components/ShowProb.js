import ReactMarkdown from 'react-markdown';
import React from 'react';

export default function ShowProb() {
  const prob = `
    # Swapping Two Numbers
    Write a program which reads two integers x and y, and prints them in ascending order.

    # Input
    The input consists of multiple datasets. Each dataset consists of two integers x and y separated by a single space.

    The input ends with two 0 (when both x and y are zero). Your program should not process for these terminal symbols.

    # Output
    For each dataset, print x and y in ascending order in a line. Put a single space between x and y.

    # Constraints
    0 ≤ x, y ≤ 10000
    the number of datasets ≤ 3000
  `;
  return <ReactMarkdown>{prob}</ReactMarkdown>;
}
