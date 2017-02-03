import test from 'ava'

import Branch from './branch'

test('hash empty branch', t => {
    const branch = new Branch(null)

    const hash = branch.getSubTreeHash()
    const emptyStringSha1Hash = 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
    t.is(hash, emptyStringSha1Hash)
});

test('hash simple branch', t => {
    const rootBranch = new Branch(null)
    rootBranch.tagName = 'DIV'

    const subBranch = new Branch(rootBranch);
    subBranch.tagName = 'INPUT'

    rootBranch.children.push(subBranch)

    const hash = rootBranch.getSubTreeHash()
    const currentRootBranchHash = 'bb2fe63e5a32cb2596d9f60d2ae271ae4d1c1787'
    t.is(hash, currentRootBranchHash)
});
