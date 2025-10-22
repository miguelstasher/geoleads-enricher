"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlobalFilters from './components/GlobalFilters';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

// Dashboard components
const StatCard = ({ title, value, icon }: { title: string, value: string, icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1 text-gray-900">{value}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-full text-blue-600">
        <span className="text-2xl" title={title}>{icon}</span>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ title, description, icon, linkTo }: { title: string, description: string, icon: string, linkTo: string }) => (
  <Link href={linkTo} className="block group">
    <div className="bg-white p-6 rounded-lg shadow-md h-full hover:shadow-lg transition-all duration-200">
      <div className="flex items-center mb-4">
        <div className="bg-blue-50 p-3 rounded-full text-blue-600 mr-4 group-hover:bg-blue-100 transition-colors duration-200">
          <span className="text-2xl" title={title}>{icon}</span>
        </div>
        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200">{title}</h3>
      </div>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{description}</p>
    </div>
  </Link>
);

interface Lead {
  id: string;
  name: string;
  website: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  poi: string;
  business_type: string;
  facebook_url: string;
  linkedin_url: string;
  location: string;
  address: string;
  created_at: string;
  record_owner: string;
  email: string;
  email_status: string;
  last_modified: string;
  campaign: string;
  currency: string;
  chain: string;
}

export default function Home() {
  const { user } = useAuth();
  
  // Dashboard view toggle
  const [viewMode, setViewMode] = useState<'personal' | 'shared'>('shared');
  
  // Load leads from Supabase
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(data || []);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      setError(error.message);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch campaigns data
  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchLeads();
    fetchCampaigns();
  }, []);

  // Calculate statistics
  const totalLeads = leads.length;
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'Live' || campaign.status === 'Active').length;
  const duplicateLeads = 0; // Simplified for now
  const waitingForEnrichment = leads.filter(lead => 
    lead.email_status === 'unverified' || 
    !lead.email || 
    lead.email === 'Not Found' || 
    lead.email === 'not_found'
  ).length;

  // Enrichment analytics
  const linkedinProfiles = leads.filter(lead => 
    lead.linkedin_url && 
    lead.linkedin_url.trim() !== '' && 
    lead.linkedin_url !== 'Not Found'
  ).length;

  const facebookPages = leads.filter(lead => 
    lead.facebook_url && 
    lead.facebook_url.trim() !== '' && 
    lead.facebook_url !== 'Not Found'
  ).length;

  const emailAddresses = leads.filter(lead => 
    lead.email && 
    lead.email.trim() !== '' && 
    lead.email !== 'Not Found' && 
    lead.email !== 'not_found'
  ).length;

  // Cannot be enriched
  const leadsWithoutWebsite = leads.filter(lead => 
    !lead.website || lead.website.trim() === ''
  ).length;

  const leadsWithoutWebsiteButWithPhone = leads.filter(lead => 
    (!lead.website || lead.website.trim() === '') && 
    (lead.phone && lead.phone.trim() !== '')
  ).length;

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8 w-full">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button 
                onClick={fetchLeads}
                className="mt-2 text-sm text-red-800 underline hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main dashboard content - only show when not loading and no error */}
      {!loading && !error && (
        <>
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Welcome to GeoLeads Enricher</h1>
            <p className="text-xl">
              Your all-in-one platform for finding, enriching, and contacting business leads from Google Maps
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('personal')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      viewMode === 'personal'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    My Leads
                  </button>
                  <button
                    onClick={() => setViewMode('shared')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      viewMode === 'shared'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    All Leads
                  </button>
                </div>
                {user?.profile && (
                  <div className="text-sm text-gray-500">
                    Logged in as <span className="font-medium text-gray-700">{user.profile.first_name}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Total Leads" 
                value={totalLeads.toString()} 
                icon="🔍"
              />
              <StatCard 
                title="Active Campaigns" 
                value={activeCampaigns.toString()} 
                icon="📊"
              />
              <StatCard 
                title="Duplicate Leads" 
                value={duplicateLeads.toString()} 
                icon="🔗"
              />
              <StatCard 
                title="Waiting for Enrichment" 
                value={waitingForEnrichment.toString()} 
                icon="⏳"
              />
            </div>
          </div>

          {/* Cannot Be Enriched Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-orange-600">Cannot Be Enriched</h3>
              <div className="bg-orange-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">{leadsWithoutWebsite}</div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{Math.round((leadsWithoutWebsite / Math.max(totalLeads, 1)) * 100)}% of all leads lack websites</p>
              <p className="text-blue-600">{leadsWithoutWebsiteButWithPhone} have phone numbers for cold calling</p>
            </div>
          </div>

          {/* Enrichment Analytics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrichment Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-600">LinkedIn Profiles</h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{linkedinProfiles}</div>
                <div className="text-sm text-gray-600">{Math.round((linkedinProfiles / Math.max(totalLeads, 1)) * 100)}% of all leads</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-600">Facebook Pages</h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{facebookPages}</div>
                <div className="text-sm text-gray-600">{Math.round((facebookPages / Math.max(totalLeads, 1)) * 100)}% of all leads</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-green-600">Email Addresses</h3>
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">{emailAddresses}</div>
                <div className="text-sm text-gray-600">{Math.round((emailAddresses / Math.max(totalLeads, 1)) * 100)}% of all leads</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                title="Extract New Leads"
                description="Find and extract new business leads from Google Maps"
                icon="🔍"
                linkTo="/leads/extract"
              />
              <FeatureCard
                title="Enrich Existing Leads"
                description="Add email addresses and social media profiles to your leads"
                icon="✨"
                linkTo="/leads/enrich"
              />
              <FeatureCard
                title="Manage Campaigns"
                description="Create and manage email campaigns for your leads"
                icon="📧"
                linkTo="/campaigns"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}