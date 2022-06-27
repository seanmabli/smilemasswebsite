while True:
  page = input("Enter a page name: ")
  file = open("src/pages/" + page.replace(" ", "").lower() + ".js", "w")
  a = """
export default function """ + page.replace(" ", "") + """() {
  return <p>""" + page + """</p>;
}
  """
  file.write(a)
  file.close()