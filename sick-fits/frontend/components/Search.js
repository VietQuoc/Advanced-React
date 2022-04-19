/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCT_QUERY = gql`
  query SEARCH_PRODUCT_QUERY($searchItem: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchItem }
          { description_contains_i: $searchItem }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCT_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  resetIdCounter();
  const findItemChill = debounce(findItems, 500);
  function handleSelectedItemChange({ selectedItem }) {
    router.push({
      pathname: `/product/${selectedItem.id}`,
    });
  }
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({ inputValue }) => {
      findItemChill({ variables: { searchItem: inputValue } });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          type="search"
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
        {/* <button
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
          >
            &#8595;
          </button> */}
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              highlighted={index === highlightedIndex}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <img
                src={item?.photo?.image?.publicUrlTransformed}
                alt={item?.name}
                width={50}
              />
              {item?.name}
            </DropDownItem>
          ))}
        {isOpen && !items?.length && !loading && (
          <DropDownItem>No items found!</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
