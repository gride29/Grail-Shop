import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import Meta from "../components/Meta";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <Meta title="GRAILSHOP | Wysyłka" />
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Wysyłka</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicAddress" className="py-2">
            <Form.Label>Ulica</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz ulicę"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasiccity" className="py-2">
            <Form.Label>Miasto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz miasto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPostalCode" className="py-2">
            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz kod pocztowy"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCountry" className="py-2">
            <Form.Label>Kraj</Form.Label>
            <select
              className="form-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled>
                Wybierz kraj
              </option>
              <option value="Polska">Polska</option>
              <option value="Afganistan">Afganistan</option>
              <option value="Albania">Albania</option>
              <option value="Algieria">Algieria</option>
              <option value="Andora">Andora</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarktyda">Antarktyda</option>
              <option value="Antigua i Barbuda">Antigua i Barbuda</option>
              <option value="Antyle Holenderskie">Antyle Holenderskie</option>
              <option value="Arabia Saudyjska">Arabia Saudyjska</option>
              <option value="Argentyna">Argentyna</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbejdżan">Azerbejdżan</option>
              <option value="Bahamy">Bahamy</option>
              <option value="Bahrajn">Bahrajn</option>
              <option value="Bangladesz">Bangladesz</option>
              <option value="Barbados">Barbados</option>
              <option value="Belgia">Belgia</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermudy">Bermudy</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Białoruś">Białoruś</option>
              <option value="Boliwia">Boliwia</option>
              <option value="Bośnia i Hercegowina">Bośnia i Hercegowina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazylia">Brazylia</option>
              <option value="Brunei">Brunei</option>
              <option value="Brytyjski Wyspy Dziewicze">
                Brytyjski Wyspy Dziewicze
              </option>
              <option value="Brytyjskie Terytorium Oceanu Indyjskiego">
                Brytyjskie Terytorium Oceanu Indyjskiego
              </option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Bułgaria">Bułgaria</option>
              <option value="Chile">Chile</option>
              <option value="Chiny">Chiny</option>
              <option value="Chorwacja">Chorwacja</option>
              <option value="Curaçao">Curaçao</option>
              <option value="Cypr">Cypr</option>
              <option value="Czad">Czad</option>
              <option value="Czarnogóra">Czarnogóra</option>
              <option value="Czechy">Czechy</option>
              <option value="Dalekie Wyspy Mniejsze Stanów Zjednoczonych">
                Dalekie Wyspy Mniejsze Stanów Zjednoczonych
              </option>
              <option value="Dania">Dania</option>
              <option value="Demokratyczna Republika Konga">
                Demokratyczna Republika Konga
              </option>
              <option value="Dominika">Dominika</option>
              <option value="Dominikana">Dominikana</option>
              <option value="Dżibuti">Dżibuti</option>
              <option value="Egipt">Egipt</option>
              <option value="Ekwador">Ekwador</option>
              <option value="Erytrea">Erytrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Etiopia">Etiopia</option>
              <option value="Falklandy">Falklandy</option>
              <option value="Fidżi">Fidżi</option>
              <option value="Filipiny">Filipiny</option>
              <option value="Finlandia">Finlandia</option>
              <option value="Francja">Francja</option>
              <option value="Francuskie Terytoria Południowe i Antarktyczne">
                Francuskie Terytoria Południowe i Antarktyczne
              </option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia Południowa i Sandwich Południowy">
                Georgia Południowa i Sandwich Południowy
              </option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Grecja">Grecja</option>
              <option value="Grenada">Grenada</option>
              <option value="Grenlandia">Grenlandia</option>
              <option value="Gruzja">Gruzja</option>
              <option value="Guam">Guam</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Gujana">Gujana</option>
              <option value="Gujana Francuska">Gujana Francuska</option>
              <option value="Gwadelupa">Gwadelupa</option>
              <option value="Gwatemala">Gwatemala</option>
              <option value="Gwinea">Gwinea</option>
              <option value="Gwinea Bissau">Gwinea Bissau</option>
              <option value="Gwinea Równikowa">Gwinea Równikowa</option>
              <option value="Haiti">Haiti</option>
              <option value="Hiszpania">Hiszpania</option>
              <option value="Holandia">Holandia</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Indie">Indie</option>
              <option value="Indonezja">Indonezja</option>
              <option value="Irak">Irak</option>
              <option value="Iran">Iran</option>
              <option value="Irlandia">Irlandia</option>
              <option value="Islandia">Islandia</option>
              <option value="Izrael">Izrael</option>
              <option value="Jamajka">Jamajka</option>
              <option value="Japonia">Japonia</option>
              <option value="Jemen">Jemen</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordania">Jordania</option>
              <option value="Kajmany">Kajmany</option>
              <option value="Kambodża">Kambodża</option>
              <option value="Kamerun">Kamerun</option>
              <option value="Kanada">Kanada</option>
              <option value="Katar">Katar</option>
              <option value="Kazachstan">Kazachstan</option>
              <option value="Kenia">Kenia</option>
              <option value="Kirgistan">Kirgistan</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Kolumbia">Kolumbia</option>
              <option value="Komory">Komory</option>
              <option value="Korea Północna">Korea Północna</option>
              <option value="Korea Południowa">Korea Południowa</option>
              <option value="Kosowo">Kosowo</option>
              <option value="Kostaryka">Kostaryka</option>
              <option value="Kuba">Kuba</option>
              <option value="Kuwejt">Kuwejt</option>
              <option value="Laos">Laos</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liban">Liban</option>
              <option value="Liberia">Liberia</option>
              <option value="Libia">Libia</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luksemburg">Luksemburg</option>
              <option value="Macedonia Północna">Macedonia Północna</option>
              <option value="Madagaskar">Madagaskar</option>
              <option value="Majotta">Majotta</option>
              <option value="Makao">Makao</option>
              <option value="Malawi">Malawi</option>
              <option value="Malediwy">Malediwy</option>
              <option value="Malezja">Malezja</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Mariany Północne">Mariany Północne</option>
              <option value="Maroko">Maroko</option>
              <option value="Martynika">Martynika</option>
              <option value="Mauretania">Mauretania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Meksyk">Meksyk</option>
              <option value="Mikronezja">Mikronezja</option>
              <option value="Mjanma">Mjanma</option>
              <option value="Monako">Monako</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Mozambik">Mozambik</option>
              <option value="Mołdawia">Mołdawia</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Niemcy">Niemcy</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Nikaragua">Nikaragua</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk">Norfolk</option>
              <option value="Norwegia">Norwegia</option>
              <option value="Nowa Kaledonia">Nowa Kaledonia</option>
              <option value="Nowa Zelandia">Nowa Zelandia</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestyna">Palestyna</option>
              <option value="Panama">Panama</option>
              <option value="Papua Nowa Gwinea">Papua Nowa Gwinea</option>
              <option value="Paragwaj">Paragwaj</option>
              <option value="Peru">Peru</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Polinezja Francuska">Polinezja Francuska</option>
              <option value="Polska">Polska</option>
              <option value="Portoryko">Portoryko</option>
              <option value="Portugalia">Portugalia</option>
              <option value="Republika Południowej Afryki">
                Republika Południowej Afryki
              </option>
              <option value="Republika Środkowoafrykańska">
                Republika Środkowoafrykańska
              </option>
              <option value="Republika Zielonego Przylądka">
                Republika Zielonego Przylądka
              </option>
              <option value="Reunion">Reunion</option>
              <option value="Rosja">Rosja</option>
              <option value="Rumunia">Rumunia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Sahara Zachodnia">Sahara Zachodnia</option>
              <option value="Saint Kitts i Nevis">Saint Kitts i Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Vincent i Grenadyny">
                Saint Vincent i Grenadyny
              </option>
              <option value="Salwador">Salwador</option>
              <option value="Samoa">Samoa</option>
              <option value="Samoa Amerykańskie">Samoa Amerykańskie</option>
              <option value="San Marino">San Marino</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seszele">Seszele</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapur">Singapur</option>
              <option value="Somalia">Somalia</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="St. Pierre i Miquelon">
                St. Pierre i Miquelon
              </option>
              <option value="Stany Zjednoczone">Stany Zjednoczone</option>
              <option value="Sudan">Sudan</option>
              <option value="Surinam">Surinam</option>
              <option value="Svalbard i Jan Mayen">Svalbard i Jan Mayen</option>
              <option value="Syria">Syria</option>
              <option value="Szwajcaria">Szwajcaria</option>
              <option value="Szwecja">Szwecja</option>
              <option value="Słowacja">Słowacja</option>
              <option value="Słowenia">Słowenia</option>
              <option value="Tadżykistan">Tadżykistan</option>
              <option value="Tajlandia">Tajlandia</option>
              <option value="Tajwan">Tajwan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Timor Wschodni">Timor Wschodni</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trynidad i Tobago">Trynidad i Tobago</option>
              <option value="Tunezja">Tunezja</option>
              <option value="Turcja">Turcja</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks i Caicos">Turks i Caicos</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraina">Ukraina</option>
              <option value="Urugwaj">Urugwaj</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Wallis i Futuna">Wallis i Futuna</option>
              <option value="Watykan">Watykan</option>
              <option value="Węgry">Węgry</option>
              <option value="Wenezuela">Wenezuela</option>
              <option value="Wielka Brytania">Wielka Brytania</option>
              <option value="Wietnam">Wietnam</option>
              <option value="CI">Wybrzeże Kości Słoniowej</option>
              <option value="Wyspa Bouveta">Wyspa Bouveta</option>
              <option value="Wyspa Bożego Narodzenia">
                Wyspa Bożego Narodzenia
              </option>
              <option value="Wyspa Man">Wyspa Man</option>
              <option value="Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha">
                Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha
              </option>
              <option value="Wyspy Alandzkie">Wyspy Alandzkie</option>
              <option value="Wyspy Cooka">Wyspy Cooka</option>
              <option value="Wyspy Dziewicze Stanów Zjednoczonych">
                Wyspy Dziewicze Stanów Zjednoczonych
              </option>
              <option value="Wyspy Heard i McDonalda">
                Wyspy Heard i McDonalda
              </option>
              <option value="Wyspy Kokosowe">Wyspy Kokosowe</option>
              <option value="Wyspy Marshalla">Wyspy Marshalla</option>
              <option value="Wyspy Owcze">Wyspy Owcze</option>
              <option value="Wyspy Salomona">Wyspy Salomona</option>
              <option value="Wyspy Świętego Tomasza i Książęca">
                Wyspy Świętego Tomasza i Książęca
              </option>
              <option value="Włochy">Włochy</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
              <option value="Zjednoczone Emiraty Arabskie">
                Zjednoczone Emiraty Arabskie
              </option>
              <option value="Łotwa">Łotwa</option>
            </select>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Kontynuuj
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
