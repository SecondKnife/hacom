// @ts-check
import { Col, Image, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { initProducts } from '../../../../constant'
import useApi from '../../../../hooks/useApi'
import EmptySearch from './EmptySearch'

const autoCompleteSlideIn = keyframes`
  0% {transform: translateY(10%);opacity: 0;}
100% {transform: translateY(0%); opacity: 1;}
`

const Wrapper = styled.div`
  & {
    position: relative;
  }
`

const AutoCompleteWrapper = styled.div`
  & {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    left: 0;
    right: 0;
    top: calc(100% + 6px);
    padding: 10px;
    z-index: 99;
    border-radius: 2px;
    font-size: 12px;
    animation: ${autoCompleteSlideIn} 0.2s linear;
    max-height: 300px;
    overflow-y: auto;
    .autocomplete-row-wrap:not(:last-child) {
      margin-bottom: 12px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
`

/**
 * @typedef {Object} AutoCompleteProps
 * @property {boolean} visible
 * @property {string} searchValue
 */

/**
 *
 * @param {import('react').PropsWithChildren<AutoCompleteProps>} props
 * @returns
 */
export default function AutoComplete({ visible, searchValue, children }) {
  const [autoCompleteProducts, setAutoCompleteProducts] = useState(initProducts)

  const { getAutoCompleteProduct } = useApi()

  useEffect(() => {
    let idSetTimeOut
    if (searchValue) {
      idSetTimeOut = setTimeout(async () => {
        const response = await getAutoCompleteProduct({
          searchValue: searchValue,
          limit: 6,
        })
        if (response) {
          setAutoCompleteProducts(response.data)
        } else {
          setAutoCompleteProducts([])
        }
      }, 500)
    }
    return () => {
      clearTimeout(idSetTimeOut)
    }
  }, [searchValue, getAutoCompleteProduct])

  return (
    <Wrapper>
      {children}
      {visible && (
        <AutoCompleteWrapper>
          {!!autoCompleteProducts.length ? (
            autoCompleteProducts.map((product) => (
              <div className="autocomplete-row-wrap">
                <Row key={product.id} gutter={[6, 6]}>
                  <Col span={3} xs={6}>
                    <Link
                      reloadDocument
                      to={`/Laptop,Tablet,Mobile/${product.id}`}
                    >
                      <Image preview={false} src={product.imgSrc} alt="" />
                    </Link>
                  </Col>
                  <Col span={21} xs={18}>
                    <Link
                      reloadDocument
                      to={`/Laptop,Tablet,Mobile/${product.id}`}
                    >
                      <Typography.Paragraph
                        style={{ margin: 0 }}
                        ellipsis={{ rows: 2 }}
                      >
                        {product.name}
                      </Typography.Paragraph>
                    </Link>
                    <Typography.Text strong>
                      {product.price}
                      <sup>₫</sup>
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <EmptySearch />
          )}
        </AutoCompleteWrapper>
      )}
    </Wrapper>
  )
}

