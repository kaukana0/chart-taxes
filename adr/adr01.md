# 1. Overall code structure and dependencies

Date: 08.2022

## Status

Accepted

## Context

- d3 exposes ESM modules (breaking change) from v. 7 onward
- the treecharts we already have (and also the example https://jsfiddle.net/GES22/ ) use d3 v. 3
    - so, amongst others, d3.layout.tree() which doesnt exist in newer d3 versions
- billboard.js depends on d3 v. 6 (d3 6 exposes no ESM modules)
- we use billboard.js a lot - so using d3 7 leads to 2 incompatible versions of the same lib - possibly throughout many future projects
    - imagine we want to do a barchart w/ billboard and a treechart in the same visualization... that means dependecies to d3 6 and d3 7...

## Decision

- migrate/reimplement the interactive treechart to d3 v. 6
- create a treechart ESM module

## Consequences

- Having to solve the problem of using "d3.v6.min.js" (commonJs) in an ESM.
- For now, we only need d3.v6.min.js. When billboard goes to d3 v7 and we decide to use that, the treechart ESM has to be adapted to use d3 v7, which shouldn't be too hard to do.
