export function* test() {
  yield this.source('./*.js').eslint()
  yield this.source('./test/*.js')
    .mocha({
      reporter: 'spec',
      timeout: 10000,
    })
}
