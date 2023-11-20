import React, { useEffect, useState } from "react";
// import useApiPost from "utils/hooks/useApiPost";
import { LoadingArea } from "components/Loader/Loader";
import Button from "components/Button/Button";

const requestKeyName: string = "requestBody";
const responseKeyName: string = "responseData";
const errorKeyName: string = "errorData";

/* The 3 different type of values can be used for indicating
 * the loading state of the API request: */
type TRequestStateState =
  | { [requestKeyName: string]: object }
  | { [responseKeyName: string]: string }
  | { [errorKeyName: string]: object }
  | undefined;

type TProps = {
  className?: string;
  collectionTicker: string;
  children: React.ReactNode;
  [x: string]: unknown;
};

const CollectButton = ({
  className,
  collectionTicker,
  children,
  ...attributes
}: TProps) => {
  const [requestState, setRequestState] = useState<TRequestStateState>();

  const isLoading: boolean =
    !!requestState && Object.hasOwn(requestState, requestKeyName);

  const hasSuccessed: boolean =
    !!requestState && Object.hasOwn(requestState, responseKeyName);

  const hasErrored: boolean =
    !!requestState && Object.hasOwn(requestState, errorKeyName);

  /* const { setRequestBody } = useApiPost({
    apiUrl: "https://64f89c50824680fd217fd571.mockapi.io/collect",
    handleSuccess: (data: the type) => {
      if (!hasSuccessed) {
        setRequestState({ [responseKeyName]: data });
      }
    },
    handleError: (error) => {
      if (!hasErrored) {
        setRequestState({ [errorKeyName]: error });
      }
    },
  }); */

  // Trigger the data posting towards the API when the loading state changes
  /* useEffect(() => {
    if (requestState && isLoading) {
      const requestedCollectionName = requestState[responseKeyName] as string;
      setRequestBody({ collectionName: requestedCollectionName });
    }
  }, [isLoading, requestState, setRequestBody]); */

  // Open the fetched URL in a new tab:
  useEffect(() => {
    if (requestState && hasSuccessed) {
      const buyLink = requestState[responseKeyName] as string;
      window.open(buyLink, "_newtab");
    }
  }, [hasSuccessed, requestState]);

  return (
    <Button
      className={className}
      disabled={isLoading || hasErrored}
      onClick={(e) => {
        e.stopPropagation();
        setRequestState({ [requestKeyName]: collectionTicker });
      }}
      {...attributes}
    >
      {/*  <LoadingArea isLoading={isLoading}>{children}</LoadingArea> */}
      <LoadingArea isLoading={true}>{children}</LoadingArea>
    </Button>
  );
};

export default CollectButton;
