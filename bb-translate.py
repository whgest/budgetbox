import csv
import codecs


def make_request():
    english_data = {}

    with open('app/locales/en.js') as fin:
        raw_data = fin.read().split('\n')

    raw_data.remove(raw_data[0])
    raw_data.insert(0, "english_data = {")

    formatted_data = '\n'.join(raw_data)

    exec formatted_data

    with open('spanish-csv.csv', 'wb') as fout:
        csv_file = csv.writer(fout)
        csv_file.writerow([u'Key', u'English String', u'Spanish Translation'])
        for block in english_data:
            for string in english_data[block]:
                csv_file.writerow([block + '.' + string, english_data[block][string]])
                csv_file.writerow([' '])


def process_request():
    def enquote(s):
        return u"\"" + s + u"\""

    data = u''

    with codecs.open('Workbook3.csv', 'r', encoding="utf-8") as fin:
        csv_file = csv.reader(fin, dialect='excel')
        last_block = None
        for row in csv_file:
            if row[0] in [u'', u' '] or row[0] == u'Key':
                continue
            block = row[0].split(u'.')[0]
            lockey = row[0].split(u'.')[1]
            string = row[2]
            string = u'test'
            if block != last_block:
                if last_block:
                    data += u"\t},\n\n"
                data += u"\t" + enquote(block) + u": {\n"
                last_block = block

            if string and lockey:
                data += u"\t\t" + enquote(lockey) + u": " + enquote(string) + u",\n"


    new_file = u"""export default {\n%s\n\t}\n};""" % data

    with codecs.open('test.js', 'w', encoding="utf-8") as fout:
        fout.write(new_file)


def main():
    #make_request()
    process_request()


if __name__ == "__main__":
    main()