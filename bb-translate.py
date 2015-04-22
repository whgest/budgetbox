import csv
import codecs
import sys

sys.path.append('../TranslationToolbelt')
import converters
import parsers


def make_request():
    english_data = {}

    with open('app/locales/en.js') as fin:
        raw_data = fin.read().split('\n')

    raw_data.remove(raw_data[0])
    raw_data.insert(0, "english_data = {")

    formatted_data = '\n'.join(raw_data)

    exec formatted_data

    keys = []
    values = {}

    for block in english_data:
        for string in english_data[block]:
            key = "%s.%s" % (block, string)
            keys.append(key)
            values[key] = english_data[block][string]

    err, book = converters.python_to_xls(keys, [values, {}],
                                         col_headers=[u'LocKey', u'English', u'Spanish'],
                                         sheet_name=u'Spanish', striped_rows=True)

    if not err:
        book.save("TranslationRequest.xls")
    else:
        print err

    # with open('spanish-csv.csv', 'wb') as fout:
    #     csv_file = csv.writer(fout)
    #     csv_file.writerow([u'LocKey', u'English String', u'Spanish Translation'])
    #     for block in english_data:
    #         for string in english_data[block]:
    #             csv_file.writerow([block + '.' + string, english_data[block][string]])
    #             csv_file.writerow([' '])


def process_request():
    def enquote(s):
        return u"\"%s\"" % s

    data = u''

    with codecs.open('Workbook3.csv', 'r', encoding="utf-8") as fin:
        csv_file = csv.reader(fin, dialect='excel')
        last_block = None
        for row in csv_file:
            if row[0].strip() == u'' or row[0] == u'LocKey':
                continue
            block = row[0].split(u'.')[0]
            lockey = row[0].split(u'.')[1]
            string = row[2]

            if block != last_block:
                if last_block:
                    data += u"\t},\n\n"
                data += u"\t%s: {\n" % enquote(block)
                last_block = block

            if string and lockey:
                data += u"\t\t%s: %s,\n" % (enquote(lockey), enquote(string))


    new_file = u"""export default {\n%s\n\t}\n};""" % data

    with codecs.open('test.js', 'w', encoding="utf-8") as fout:
        fout.write(new_file)


def main():
    make_request()
    #process_request()
    pass


if __name__ == "__main__":
    main()