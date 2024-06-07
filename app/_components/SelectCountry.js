import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {

  // TO BE UNCOMMENTED WHEN API IS WORKING
  // const countries = await getCountries();
  // const flag =
  //   countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  const countries = [];

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      // TO BE UNCOMMENTED WHEN API IS WORKING
      // defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
