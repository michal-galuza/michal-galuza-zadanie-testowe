import { useSelector } from "react-redux";
import { authorsState } from "../../state/authors/authors";
import { publishersState } from "../../state/publishers/publishers";
import Layout from "../../components/LayoutWrapper/Layout";
export default function Books() {
  const { authors } = useSelector(authorsState);
  const { publishers } = useSelector(publishersState);
  return (
    <Layout title="Książki" pathToAdd="/books/add">
      <form>
        <select>
          <option value="" selected disabled hidden>
            Wbierz autora
          </option>
          {authors.map((item, index) => (
            <option value={item.id} key={"authorsOptionNR" + index}>
              {item.firstName + " " + item.lastName}
            </option>
          ))}
        </select>
      </form>
    </Layout>
  );
}
