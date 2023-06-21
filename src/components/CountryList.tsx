import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );

  const countries = cities.reduce(
    (acc, city) => {
      if (!acc.some((country) => country.country === city.country)) {
        acc.push({
          country: city.country,
          emoji: city.emoji,
        });
      }
      return acc;
    },
    [] as {
      country: string;
      emoji: string;
    }[]
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
export default CountryList;
