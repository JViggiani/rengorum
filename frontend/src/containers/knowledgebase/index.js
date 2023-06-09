import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKnowledgeBase } from '../../actions';
import DocumentTable from '../../components/documenttable';
import { generateSlug } from "random-word-slugs";
import { useParams } from 'react-router-dom';

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  return {
    fileName: generateSlug(4, { format: "title" }),
    fileType: generateSlug(1, { format: "title" }),
    fileSize: Math.floor(Math.random() * 30),
  }
}

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

const KnowledgeBaseContainer = () => {

  // // Fetch data from Redux store 
  // TODO
  const {
    knowledgeBase,
    isLoading,
    name,
    content,
    pinned,
    creator,
    createdAt,
    posts,
    error,
    isAuthenticated,
    newPostLoading,
    newPostError,
    newPostSuccess,
    authenticatedUsername,
    authenticatedIsStaff,
    deletePostList,
    isDeleting,
    deleteError,
  } = useSelector((state) => ({
    ...state.knowledgeBase,
    isAuthenticated: state.auth.isAuthenticated,
    authenticatedUsername: state.auth.username,
    authenticatedIsStaff: state.auth.isStaff,
  }));

console.log('knowledgeBase:', knowledgeBase);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKnowledgeBase());
  }, [dispatch]);

  // JOSH temp hardcoded test data
  // const knowledgeBase = makeData(10);
  console.log(`JOSH - knowledgeBase: ${JSON.stringify(knowledgeBase)}`);

  const columns = React.useMemo(
    () => [
      {
        Header: 'File Name',
        accessor: 'name',
      },
      {
        Header: 'File Type',
        accessor: 'type',
      },
      {
        Header: 'File Size',
        accessor: 'size',
      },
    ],
    []
  );

  return (
    <div>
      <DocumentTable columns={columns} data={knowledgeBase} />
    </div>
  );
}

export default KnowledgeBaseContainer;
