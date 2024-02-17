import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const [previousResponse, setPreviousResponse] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: (values) => {
      submit("", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      comment: Yup.string().required("Required"),
    }),
  });

  useEffect(() => {
    if (response !== previousResponse) {
      setPreviousResponse(response);
      if (response?.type === 'success'){
        onOpen('success', `Success~ Hello, ${formik.values.firstName}`);
        formik.resetForm();
      } else if(response){
        onOpen('error', response.message);
      }
    }
  }, [response, formik, previousResponse, onOpen]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32}>
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              >
                <FormLabel htmlFor="firstNameId">Name</FormLabel>
                <Input id="firstNameId" {...formik.getFieldProps("firstName")} placeholder="First Name"/>
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="emailId">Email Address</FormLabel>
                <Input id="emailId"{...formik.getFieldProps("email")} placeholder="Email Address" autoComplete="off"/>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="typeId">Type of enquiry</FormLabel>
                <Select
                  id="typeId"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  color={formik.values.type ? "white" : "gray.500"}
                >
                  <option value="" disabled style={{color: "black"}}>Select an option...</option>
                  <option value="hireMe" style={{color: "black"}}>Freelance project proposal</option>
                  <option value="openSource" style={{color: "black"}}>Open source consultancy session</option>
                  <option value="other" style={{color: "black"}}>Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="commentId">Your message</FormLabel>
                <Textarea id="commentId" {...formik.getFieldProps("comment")} placeholder="Your message"/>
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" disabled={isLoading} colorScheme="purple" width="full">
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
