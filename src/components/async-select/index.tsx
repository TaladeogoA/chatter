import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate";

interface AsyncSelectProps extends AsyncPaginateProps<any, any, any, any> {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  register?: any;
  htmlFor?: string;
  placeholder?: string;
  loadOptions: any;
  handleChange?: any;
  onChange?: (e: any) => void;
  value?: any;
  isMulti?: boolean;
  labelWeight?: string;
  labelSize?: string;
  labelColor?: string;
  bgColor?: string;
  isClearable?: boolean;
  placeholderSize?: string;
  placeholderColor?: string;
  singleValueSize?: string;
  isDisabled?: boolean;
  closeOnSelect?: boolean;
}

const AsyncSelect: FunctionComponent<AsyncSelectProps> = ({
  isRequired,
  label,
  errorMessage,
  register,
  htmlFor,
  placeholder,
  loadOptions,
  handleChange,
  onChange,
  value,
  labelWeight = "700",
  labelSize = "1.6rem",
  labelColor = "typography.gray",
  bgColor = "white",
  isClearable = false,
  placeholderSize = "1rem",
  placeholderColor = "rgb(190,190,190)",
  singleValueSize = "1rem",
  isDisabled,
  isMulti,
  closeOnSelect,
  ...otherProps
}) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && (
        <FormLabel
          fontSize={labelSize}
          fontWeight={labelWeight}
          mb={"0.8rem"}
          color={labelColor}
        >
          {label}
        </FormLabel>
      )}
      <AsyncPaginate
        isClearable={isClearable}
        {...register}
        handleChange={handleChange}
        onChange={onChange}
        isDisabled={isDisabled}
        debounceTimeout={1000}
        isSearchable={true}
        placeholder={placeholder}
        loadOptions={loadOptions}
        isMulti={isMulti}
        value={value}
        additional={{
          page: 1,
        }}
        {...otherProps}
        styles={{
          dropdownIndicator: (provided, _) => ({
            ...provided,
            bg: "transparent",
            px: 2,
            cursor: "inherit",
          }),
          indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none",
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            background: state.isFocused ? "#F5F5F5" : "#ffffff",
            color: state.isDisabled ? "#dddddd" : "#525252",
          }),
          container: (provided: any) => ({
            ...provided,
            minHeight: "4.1rem",
          }),
          control: (provided: any) => ({
            ...provided,
            border: "1px solid #F5F5F5",
            background: bgColor,
            borderRadius: ".4rem",
            paddingLeft: "1rem",
            height: "100%",
            width: "100%",
          }),
          input: (provided) => ({
            ...provided,
            color: "#A0A0A0",
            // fontSize: themes.fontSizes.label,
          }),
          singleValue: (provided: any) => ({
            ...provided,
            overflow: "visible",
            fontSize: singleValueSize,
          }),
          menu: (provided: any) => ({
            ...provided,
            overflow: "visible",
            backgroundColor: "#FCFCFC",
          }),
          menuList: (provided: any) => ({
            ...provided,
            height: "100%",
            width: "100%",
            minWidth: "unset",
            // fontSize: themes.fontSizes.label,
          }),
          valueContainer: (provided: any) => ({
            ...provided,
            padding: 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: placeholderColor,
            fontSize: placeholderSize,
          }),
        }}
        closeMenuOnSelect={closeOnSelect ?? true}
      />
      {errorMessage && (
        <FormHelperText fontSize="1rem" color="red">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AsyncSelect;
