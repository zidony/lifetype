<?php

	lt_include( PLOG_CLASS_PATH."class/database/pdb/drivers/pdbrecordset.class.php" );

    /**
     * \ingroup PDb
     *
     * MySQL record sets.
     *
     * @see PDbRecordSet
     */
	class PdbMySQLRecordSet extends PdbRecordSet
	{
	
	    /**
	     * @see PDbRecordSet
	     */
		function PdbMySQLRecordSet( $dbRes = null )
		{
			$this->PdbRecordSet( $dbRes );
		}

	    /**
	     * @see PDbRecordSet::FetchRow()
	     */		
		function FetchRow()
		{
			return( mysqli_fetch_assoc( $this->_dbRes ));
		}

	    /**
	     * @see PDbRecordSet::RecordCount()
	     */				
		function RecordCount()
		{
			return( mysqli_num_rows( $this->_dbRes ));
		}
		
	    /**
	     * @see PDbRecordSet::Close()
	     */				
		function Close()
		{
		    return( mysqli_free_result( $this->_dbRes ));
		}
	}
?>
