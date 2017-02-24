import test from 'ava'
import {stripIndents} from 'common-tags'

import sha1 from './lib/sha1-min'
import Tree from './tree'
import Branch from './branch'

const getHtml = (str) => {
  var d = document.createElement('div')
  d.innerHTML = str.replace(/\n/g, '')
  return d.firstChild
}

const getFulfilledTree = () => {
  const str = stripIndents`<form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
  </form>`
  const html = getHtml(str)

  const tree = new Tree()
  tree.fill(html)

  return tree
}

test('base tree parser', t => {
  const tree = getFulfilledTree()

  const p1 = tree.root.children[0]
  const p2 = tree.root.children[1]

  const p1_input = p1.children[2]
  const p2_input = p2.children[1]

  t.is(tree.root.tagName, 'FORM')
  t.is(tree.root.children.length, 2)

  t.is(p1.tagCode, 'DIV')
  t.is(p1.children[1].tagCode, 'P')
  t.is(p2.html, '<span>field 2</span><input type=\"text\" id=\"field2\">')

  t.is(p1_input.tagName, 'INPUT')
  t.is(p1_input.tagCode, 'FIELD')
  t.is(p2_input.parent.tagName, 'DIV')
})

test('calculate hashes', t => {
  const tree = getFulfilledTree()
  tree.calculateHashes()

  const hashes = []
  Branch.forEach(b => hashes.push(b.hash), tree.root)

  const expectedHashes = [
    sha1(['DIV', 'SPAN', 'TEXT', 'P', 'TEXT', 'FIELD', 'DIV', 'SPAN', 'TEXT', 'FIELD'].join()),
    sha1(['SPAN', 'TEXT', 'P', 'TEXT', 'FIELD'].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1([].join()),
    sha1(['SPAN', 'TEXT', 'FIELD'].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1([].join())
  ]

  t.deepEqual(expectedHashes, hashes)
})

test.skip('walk through the tree [test has not been finished]', t => {
  const html = getHtml(stripIndents`
  <form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
    <div>
      <span>field 3</span>
      <input type="text" id="field3" />
    </div>
  </form>`)

  const tree = new Tree()
  tree.fill(html)

  tree.walkThroughLevels(branch => {}, level => {})
})

test('find patterns', t => {
  const html = getHtml(stripIndents`
  <form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
    <div>
      <span>field 3</span>
      <input type="text" id="field3" />
    </div>
  </form>`)

  const tree = new Tree()
  tree.fill(html)

  tree.calculateHashes()

  const patterns = tree.getPatterns()
  t.is(patterns.length, 1)

  const firstPattern = patterns[0]
  t.is(firstPattern.elements[0].tagName, 'DIV')
  t.is(firstPattern.count, 2)
})

test('find patterns in mail service form', t => {
  const html = getHtml(stripIndents`
  <form action="0805_1-answer.asp" id="formu" method="post" name="formu" onsubmit="return ValidaForm(this)">
    <table border="0" cellpadding="2" cellspacing="0" class="txtNormal">
      <tbody>
        <tr>
          <td width="85"><label for="des_nombre"><strong>Nombre:*</strong></label></td>
          <td colspan="5"><input class="FormObject" id="des_nombre" maxlength="45" name="des_nombre" size="41" style="width:304" type="text" value=""></td>
        </tr>
        <tr>
          <td height="10"><label for="des_apellidos"><strong>Apellidos:*</strong></label></td>
          <td colspan="5"><input class="FormObject" id="des_apellido1" maxlength="45" name="des_apellido1" size="41" style="width:304" type="text" value=""></td>
        </tr>
        <tr>
          <td height="10"><label for="des_calle"><strong>Calle:*</strong></label></td>
          <td><input class="FormObject" id="des_calle" maxlength="200" name="des_calle" size="20" style="width:250" type="text"></td>
          <td align="left" height="10"><label for="des_numero"><strong>Numero:*</strong></label></td>
          <td><input class="FormObject" id="des_numero" maxlength="50" name="des_numero" size="14" style="width:50" type="text"></td>
          <td align="left" height="10"><label for="des_piso"><strong>Piso:*</strong></label></td>
          <td><input class="FormObject" id="des_piso" maxlength="50" name="des_piso" size="14" style="width:50" type="text"></td>
        </tr>
        <tr>
          <td height="10"><label for="des_poblacion"><strong>Población:*</strong></label></td>
          <td><input class="FormObject" id="des_poblacion" maxlength="150" name="des_poblacion" size="20" style="width:200" type="text"></td>
          <td align="left" height="10"><label for="des_provincia"><strong>Provincia:*</strong></label></td>
          <td colspan="2"><input class="FormObject" id="des_provincia" maxlength="50" name="des_provincia" size="14" style="width:120" type="text"></td>
        </tr>
        <tr>
          <td height="10"><label for="des_apellid2"><strong>Teléfono:</strong></label></td>
          <td><input class="FormObject" id="des_telefono" maxlength="12" name="des_telefono" size="20" style="width:200" type="text"></td>
          <td align="left" height="10"><label for="des_cp"><strong>CP:*</strong></label></td>
          <td colspan="2"><input class="FormObject" id="des_cp" maxlength="5" name="des_cp" size="14" style="width:50" type="text"></td>
        </tr>
        <tr>
          <td height="10"><label for="des_email"><strong>E-Mail:*</strong></label></td>
          <td colspan="5"><input class="FormObject" id="email1" maxlength="50" name="email1" size="41" type="text" value=""></td>
        </tr>
        <tr>
          <td class="txtSubindice" colspan="6">
            <br>
            <p class="txtNormal">* Campo obligatorio</p>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="txtNormal"><br>
    Por favor complete el siguiente campo con el texto de su solicitud de información. <b><u>Si su consulta se refiere a un envío postal, por favor haga constar el número de referencia del mismo.</u></b></p>
    <table border="0" cellpadding="0" cellspacing="0" width="392">
      <tbody>
        <tr align="left">
          <td height="10"><img alt="" height="1" src="/comun/img/pix_fondo.gif" width="1"></td>
          <td align="left" height="1">
          <textarea class="FormObject" cols="80" maxlength="800" name="des_mensaje" rows="10" style="width:400"></textarea></td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <table border="0" cellpadding="0" cellspacing="0" width="450">
      <tbody>
        <tr>
          <td class="sp" height="1" width="1">&nbsp;</td>
          <td class="sp" height="1" width="1">&nbsp;</td>
          <td align="left" class="txtDest" colspan="3" height="50">
            <table border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="txtNormal"><b><label for="captcha">Verificar Números <sup>1</sup>:&nbsp;</label></b></td>
                  <td class="txtNormal"><input class="txtNormal" id="captcha" maxlength="8" name="captcha" size="11" type="text"></td>
                  <td class="txtNormal"><img align="absmiddle" alt="Captcha" height="21" id="imgCaptcha" src="AspCaptcha.asp" title="Captcha" width="86"></td>
                  <td class="botonst"><input class="botonst" id="btnRecargaCaptcha" name="btnRecargaCaptcha" onclick="recargarCaptcha()" style="width:120px;background:transparent url(/comun/img/fondoBoton.jpg) scroll left top ;border-color:#0A5187;color:#FFFFFF;FONT-FAMILY:Arial, Helvetica, sans-serif;FONT-WEIGHT: bold;margin-left:10px" type="button" value="Nueva Imagen"></td>
                </tr>
                <tr class="txtSubindice">
                  <td colspan="4">&nbsp;</td>
                </tr>
                <tr align="left" class="txtSubindice">
                  <td colspan="4">
                    <p class="txtNormal"><sup>1</sup> Escribe los caracteres que se ven en la imagen.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="txtNormal" colspan="4" valign="top"><br>
                  <input accesskey="e" class="botonst" style="width:120px;background:transparent url(/comun/img/fondoBoton.jpg) scroll left top ;border-color:#0A5187;color:#FFFFFF;FONT-FAMILY:Arial, Helvetica, sans-serif;FONT-WEIGHT: bold;margin-left:10px" type="submit" value="Enviar"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </form>`)

  const tree = new Tree()
  tree.fill(html)

  tree.calculateHashes()

  const patterns = tree.getPatterns()

  t.is(2, patterns.length)
  t.is(3, patterns[0].count)
  t.is(2, patterns[1].count)
})

test.skip('longest sequence identification performance test', t => {
  const tree = new Tree()
  const amounts = [10, 30, 70, 100, 130, 150, 180, 210]

  console.log('Performance test:')

  const getHashForArray = (arr) => {
    return sha1(arr.join())
  }

  amounts.map(x => {
    console.log('Amount:', x, 'elements in array.')

    const array = []
    const possibleElements = ['LABEL', 'INPUT', 'SPAN', 'DIV', 'P']
    for (let i = 0; i < x; i++) {
      const randomElement = Math.floor(Math.random() * 4)  
      array.push(possibleElements[randomElement])
    }

    const t0 = new Date().getTime()
    const longestPattern = tree.findLongestHashSet(array, getHashForArray)
    const t1 = new Date().getTime()

    console.log("Call took " + (t1 - t0) + " milliseconds.")
    console.log(longestPattern)
    console.log('-----------')
  })

  t.pass()
})
