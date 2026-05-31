import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RefreshCw, Plus, ExternalLink, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';

interface OfferSetting {
  id: string;
  name: string;
  slug: string;
  url_path: string;
  is_active: boolean;
  expires_at: string | null;
  passcode: string | null;
  created_at: string;
  updated_at: string;
}

const OffersManager = () => {
  const [offers, setOffers] = useState<OfferSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editExpiry, setEditExpiry] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: '',
    slug: '',
    url_path: '',
    passcode: '',
    expires_at: '',
  });

  const fetchOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('offer_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch offers');
    } else {
      setOffers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const toggleActive = async (offer: OfferSetting) => {
    const { error } = await supabase
      .from('offer_settings')
      .update({ is_active: !offer.is_active, updated_at: new Date().toISOString() })
      .eq('id', offer.id);

    if (error) {
      toast.error('Failed to update offer');
    } else {
      toast.success(`Offer ${!offer.is_active ? 'activated' : 'deactivated'}`);
      fetchOffers();
    }
  };

  const saveExpiry = async (id: string) => {
    const { error } = await supabase
      .from('offer_settings')
      .update({
        expires_at: editExpiry ? new Date(editExpiry).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update expiry');
    } else {
      toast.success('Expiry date updated');
      setEditingId(null);
      fetchOffers();
    }
  };

  const createOffer = async () => {
    if (!newOffer.name || !newOffer.slug || !newOffer.url_path) {
      toast.error('Name, slug, and URL path are required');
      return;
    }
    const { error } = await supabase.from('offer_settings').insert({
      name: newOffer.name,
      slug: newOffer.slug,
      url_path: newOffer.url_path,
      passcode: newOffer.passcode || null,
      expires_at: newOffer.expires_at ? new Date(newOffer.expires_at).toISOString() : null,
      is_active: true,
    });

    if (error) {
      toast.error('Failed to create offer: ' + error.message);
    } else {
      toast.success('Offer created');
      setShowNewForm(false);
      setNewOffer({ name: '', slug: '', url_path: '', passcode: '', expires_at: '' });
      fetchOffers();
    }
  };

  const getOfferStatus = (offer: OfferSetting): 'active' | 'expired' | 'inactive' => {
    if (!offer.is_active) return 'inactive';
    if (offer.expires_at && new Date(offer.expires_at) < new Date()) return 'expired';
    return 'active';
  };

  const statusBadge = (status: 'active' | 'expired' | 'inactive') => {
    const styles = {
      active: 'bg-green-200 text-green-800',
      expired: 'bg-red-200 text-red-800',
      inactive: 'bg-gray-200 text-gray-800',
    };
    return styles[status];
  };

  const toLocalDatetimeValue = (iso: string | null) => {
    if (!iso) return '';
    const d = new Date(iso);
    // Format as YYYY-MM-DDTHH:MM for datetime-local input
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase">Offer Pages</h2>
          <p className="text-sm text-muted-foreground">
            {offers.length} offer{offers.length !== 1 ? 's' : ''} — activate, deactivate, or set expiry
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchOffers}
            variant="outline"
            className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={() => setShowNewForm(!showNewForm)}
            className="bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Offer
          </Button>
        </div>
      </div>

      {/* New Offer Form */}
      {showNewForm && (
        <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase">Create New Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Offer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Jassim — VC Mentorship"
                  className="w-full p-3 border-2 border-foreground font-semibold"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Slug * (matches offer_type)</label>
                <input
                  type="text"
                  placeholder="e.g. vc_fundraising_mentorship"
                  className="w-full p-3 border-2 border-foreground font-semibold"
                  value={newOffer.slug}
                  onChange={(e) => setNewOffer({ ...newOffer, slug: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">URL Path *</label>
                <input
                  type="text"
                  placeholder="e.g. /mentorship-offer"
                  className="w-full p-3 border-2 border-foreground font-semibold"
                  value={newOffer.url_path}
                  onChange={(e) => setNewOffer({ ...newOffer, url_path: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Passcode</label>
                <input
                  type="text"
                  placeholder="e.g. 2000"
                  className="w-full p-3 border-2 border-foreground font-semibold"
                  value={newOffer.passcode}
                  onChange={(e) => setNewOffer({ ...newOffer, passcode: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Expires At (optional)</label>
                <input
                  type="datetime-local"
                  className="w-full p-3 border-2 border-foreground font-semibold"
                  value={newOffer.expires_at}
                  onChange={(e) => setNewOffer({ ...newOffer, expires_at: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={createOffer}
                className="bg-foreground text-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Create Offer
              </Button>
              <Button
                onClick={() => setShowNewForm(false)}
                variant="outline"
                className="border-2 border-foreground"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offers List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-lg font-bold">Loading offers...</div>
        </div>
      ) : offers.length === 0 ? (
        <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold">No offers yet</p>
            <p className="text-sm text-muted-foreground">Create your first offer above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {offers.map((offer) => {
            const status = getOfferStatus(offer);
            return (
              <Card
                key={offer.id}
                className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg font-bold">{offer.name}</CardTitle>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{offer.url_path}</p>
                    </div>
                    <Badge className={`${statusBadge(status)} font-bold uppercase text-xs flex-shrink-0`}>
                      {status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Slug</p>
                      <p className="font-mono font-medium">{offer.slug}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Passcode</p>
                      <p className="font-medium">{offer.passcode || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Expires At</p>
                      <p className="font-medium">
                        {offer.expires_at
                          ? new Date(offer.expires_at).toLocaleString('en-US', {
                              year: 'numeric', month: 'short', day: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            })
                          : 'No expiry'}
                      </p>
                    </div>
                  </div>

                  {/* Expiry editor */}
                  {editingId === offer.id && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-muted border-2 border-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <input
                        type="datetime-local"
                        className="flex-1 p-2 border-2 border-foreground font-semibold text-sm"
                        value={editExpiry}
                        onChange={(e) => setEditExpiry(e.target.value)}
                      />
                      <Button
                        onClick={() => saveExpiry(offer.id)}
                        className="bg-foreground text-white border-2 border-foreground text-xs px-3 py-2 h-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        variant="outline"
                        className="border-2 border-foreground text-xs px-3 py-2 h-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Toggle active */}
                    <Button
                      onClick={() => toggleActive(offer)}
                      variant="outline"
                      className={`border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all gap-2 ${
                        offer.is_active ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {offer.is_active
                        ? <><ToggleRight className="w-4 h-4 text-green-700" /> Deactivate</>
                        : <><ToggleLeft className="w-4 h-4 text-gray-500" /> Activate</>
                      }
                    </Button>

                    {/* Edit expiry */}
                    <Button
                      onClick={() => {
                        setEditingId(offer.id);
                        setEditExpiry(toLocalDatetimeValue(offer.expires_at));
                      }}
                      variant="outline"
                      className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all gap-2"
                    >
                      <Calendar className="w-4 h-4" /> Set Expiry
                    </Button>

                    {/* Open page */}
                    <a
                      href={offer.url_path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all gap-2"
                      >
                        <ExternalLink className="w-4 h-4" /> Open Page
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OffersManager;
