import { createPortal } from "react-dom";
import { useSearch } from "./useSearch";
import { SearchTrigger } from "./SearchTrigger";
import { SearchModal } from "./SearchModal";

export function Search() {
  const { state, inputRef, modalRef, open, close, setQuery } = useSearch();

  return (
    <>
      <SearchTrigger onClick={open} />
      {state.isOpen &&
        createPortal(
          <>
            <div className="search-backdrop" onClick={close} />
            <div className="search-modal-container">
              <SearchModal
                ref={modalRef}
                query={state.query}
                results={state.results}
                searchData={state.searchData}
                selectedIndex={state.selectedIndex}
                inputRef={inputRef}
                onQueryChange={setQuery}
                onClose={close}
              />
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export default Search;
